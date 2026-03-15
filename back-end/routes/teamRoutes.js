const express = require("express");
const router = express.Router();

const Team = require("../models/Team");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const teamAuth = require("../middleware/teamAuth");
const sendEmail = require("../utils/sendEmail");


/* ======================================================
   ✅ REGISTER
====================================================== */

router.post("/register", async (req, res) => {

  console.log("REGISTER BODY:",req.body);
  try {

    const {
      teamName,
      leader,
      members,
      department,
      year,
      domain,
      problemTitle,
      abstract
    } = req.body;

    if (!leader.password)
      return res.status(400).json({
        message: "Password is required"
      });

    const existing = await Team.findOne({
      $or: [
        { "leader.regNo": leader.regNo },
        { "members.regNo": leader.regNo }
      ]
    });

    if (existing)
      return res.status(400).json({
        message: "Leader already registered"
      });

    leader.password = await bcrypt.hash(leader.password, 10);

    /* ===== TEAM ID GENERATE ===== */

    const count = await Team.countDocuments();
    const teamId = count + 1;

    const team = new Team({
      teamId,
      teamName,
      leader,
      members,
      department,
      year,
      domain,
      problemTitle,
      abstract
    });

    await team.save();

    const emails = [
  leader.email,
  ...members.filter(m => m.email).map(m => m.email)
];

    try {

  await sendEmail(
    emails,
    "Protothon 2026 | Registration Confirmed",
    `
    <h2>Protothon 2026</h2>

    <p>Hello Team ${teamName},</p>

    <p>Your registration for Protothon 2026 has been successfully completed.</p>

    <p><b>Team ID:</b> ${teamId}</p>
    <p><b>Domain:</b> ${domain}</p>
    <p><b>Problem Statement:</b> ${problemTitle}</p>

    <p>
    Login here:
    https://protothon-2026.vercel.app/#home
    </p>

    <p>
    Thank you for registering for Protothon 2026.
    </p>

    <p>
    Best Regards<br/>
    Protothon 2026 Organizing Team<br/>
    Saranathan College of Engineering
    </p>

    <p>
    For any queries: it264061@saranathan.ac.in
    </p>
    `
  );

} catch(err) {

  console.log("Email failed:", err);

}

    res.json({
      message: "Registered Successfully",
      teamId: teamId
    });

  } catch (err) {

    console.log("REGISTER ERROR:", err);

    res.status(400).json({
      message: err.message
    });

  }
});


/* ======================================================
   ✅ LOGIN (Leader OR Member)
====================================================== */

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const team = await Team.findOne({
      $or: [
        { "leader.email": email },
        { "members.email": email }
      ]
    });

    if (!team)
      return res.status(404).json({
        message: "Not registered"
      });

    const valid = await bcrypt.compare(
      password,
      team.leader.password
    );

    if (!valid)
      return res.status(401).json({
        message: "Invalid Password"
      });

    const token = jwt.sign(
      { teamId: team._id },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.json({
      token,
      teamName: team.teamName,
      teamId: team.teamId
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error"
    });

  }
});


/* ======================================================
   ✅ DASHBOARD (SECURE)
====================================================== */

router.get("/dashboard", teamAuth, async (req, res) => {

  try {

    const team = await Team.findById(req.team.teamId)
      .select("-leader.password");

    if (!team)
      return res.status(404).json({
        message: "Team not found"
      });

    res.json(team);

  } catch (err) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});


/* ======================================================
   ✅ UPDATE ABSTRACT (Editable till March 10)
====================================================== */

router.put("/update-abstract", teamAuth, async (req, res) => {

  try {

    const deadline = new Date("2026-03-18T23:59:59");

    if (new Date() > deadline)
      return res.status(403).json({
        message: "Editing time expired"
      });

    const updated = await Team.findByIdAndUpdate(
      req.team.teamId,
      { abstract: req.body.abstract },
      { new: true }
    ).select("-leader.password");

    res.json(updated);

  } catch (err) {

    res.status(500).json({
      message: "Update failed"
    });

  }

});


/* ======================================================
   ✅ GET ALL TEAMS (STAFF DASHBOARD)
====================================================== */

router.get("/teams", async (req, res) => {

  try {

    const teams = await Team.find()
      .select("-leader.password");

    res.json(teams);

  } catch (err) {

    res.status(500).json({
      message: "Failed to fetch teams"
    });

  }

});


/* ======================================================
   ✅ UPDATE TEAM STATUS (STAFF)
====================================================== */

router.put("/status/:id", async (req, res) => {

  try {

    const updated = await Team.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json(updated);

  } catch (err) {

    res.status(500).json({
      message: "Status update failed"
    });

  }

});

const ExcelJS = require("exceljs");

/* ======================================================
   EXPORT TEAMS TO EXCEL
====================================================== */

router.get("/export", async (req, res) => {

  try {

    const teams = await Team.find().select("-leader.password");

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Ideathon Teams");

    worksheet.columns = [
      { header: "Team ID", key: "teamId", width: 10 },
      { header: "Team Name", key: "teamName", width: 25 },
      { header: "Domain", key: "domain", width: 20 },
      { header: "Problem Title", key: "problemTitle", width: 30 },
      { header: "Status", key: "status", width: 15 }
    ];

    teams.forEach(team => {
      worksheet.addRow({
        teamId: team.teamId,
        teamName: team.teamName,
        domain: team.domain,
        problemTitle: team.problemTitle,
        status: team.status
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=ideathon_teams.xlsx"
    );

    await workbook.xlsx.write(res);

    res.end();

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Export failed"
    });

  }

});


module.exports = router;

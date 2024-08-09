const express = require('express');
const { sql, poolPromise } = require('../models/db');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/create', authMiddleware, async (req, res) => {
    try {
        const { issue, priority, remarks, targetDate } = req.body;
        const pool = await poolPromise;

        await pool.request()
            .input('UserID', sql.Int, req.user.userId)
            .input('Issue', sql.NVarChar, issue)
            .input('Priority', sql.NVarChar, priority)
            .input('Remarks', sql.NVarChar, remarks)
            .input('TargetDate', sql.Date, targetDate)
            .query(`
                INSERT INTO Tickets (UserID, Issue, Priority, Remarks, TargetDate)
                VALUES (@UserID, @Issue, @Priority, @Remarks, @TargetDate)
            `);

        res.status(201).json({ message: 'Ticket created successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/my-tickets', authMiddleware, async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('UserID', sql.Int, req.user.userId)
            .query('SELECT * FROM Tickets WHERE UserID = @UserID');

        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('TicketID', sql.Int, req.params.id)
            .query('SELECT * FROM Tickets WHERE TicketID = @TicketID AND UserID = @UserID', {
                UserID: req.user.userId,
            });

        const ticket = result.recordset[0];
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.json(ticket);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { pgPool } = require('../config/db');

// LIST ALL
router.get('/todos', async (req, res) => {
    console.log('GET /todos');

    try {
        const { rows } = await pgPool.query(
            'SELECT * FROM tasks ORDER BY created_at DESC'
        );

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET ONE
router.get('/todos/:id', async (req, res) => {
    console.log('GET /todos/:id');

    const { id } = req.params;

    try {
        const { rows } = await pgPool.query(
            'SELECT * FROM tasks WHERE id = $1',
            [id]
        );

        if (!rows.length) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// CREATE
router.post('/todos', async (req, res) => {
    console.log('POST /todos');

    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title needed' });
    }

    try {
        const { rows } = await pgPool.query(
            'INSERT INTO tasks (title) VALUES ($1) RETURNING *',
            [title]
        );

        res.status(201).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// UPDATE (full resource)
router.put('/todos/:id', async (req, res) => {
    console.log('PUT /todos/:id');

    const { id } = req.params;
    const { title, completed } = req.body;

    if (title === undefined || completed === undefined) {
        return res.status(400).json({ error: 'title and completed required' });
    }

    try {
        const { rows } = await pgPool.query(
            `
            UPDATE tasks
            SET title = $1,
                completed = $2,
                updated_at = now()
            WHERE id = $3
            RETURNING *
            `,
            [title, completed, id]
        );

        if (!rows.length) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// COMPLETE (partial update)
router.patch('/todos/:id/complete', async (req, res) => {
    console.log('PATCH /todos/:id/complete');

    const { id } = req.params;

    try {
        const { rows } = await pgPool.query(
            `
            UPDATE tasks
            SET completed = true,
                updated_at = now()
            WHERE id = $1
            RETURNING *
            `,
            [id]
        );

        if (!rows.length) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE
router.delete('/todos/:id', async (req, res) => {
    console.log('DELETE /todos/:id');

    const { id } = req.params;

    try {
        const { rows } = await pgPool.query(
            'DELETE FROM tasks WHERE id = $1 RETURNING *',
            [id]
        );

        if (!rows.length) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const users = [
        {
                id: 1,
                email: "admin@example.com",
                name: "Admin User",
                role: "admin",
                photoURL: null
        },
        {
                id: 2,
                email: "doctor@example.com",
                name: "Dr. Sarah Johnson",
                role: "doctor",
                photoURL: null
        },
        {
                id: 3,
                email: "patient@example.com",
                name: "John Doe",
                role: "patient",
                photoURL: null
        }
];

const doctors = [
        {
                id: 1,
                name: "Dr. Sarah Johnson",
                specialty: "Cardiology",
                experience: "10 years",
                rating: 4.9,
                consultationFee: 200,
                email: "doctor@example.com",
                status: "active"
        },
        {
                id: 2,
                name: "Dr. Michael Chen",
                specialty: "Dermatology",
                experience: "8 years",
                rating: 4.8,
                consultationFee: 150,
                email: "michael.chen@example.com",
                status: "active"
        },
        {
                id: 3,
                name: "Dr. Emily Davis",
                specialty: "General Practice",
                experience: "12 years",
                rating: 4.7,
                consultationFee: 120,
                email: "emily.davis@example.com",
                status: "active"
        },
        {
                id: 4,
                name: "Dr. James Wilson",
                specialty: "Neurology",
                experience: "15 years",
                rating: 4.9,
                consultationFee: 250,
                email: "james.wilson@example.com",
                status: "active"
        }
];

// Routes

// Get all users or filter by email
app.get('/users', (req, res) => {
        const { email } = req.query;

        if (email) {
                const user = users.find(u => u.email === email);
                if (user) {
                        res.json([user]);
                } else {
                        res.json([]);
                }
        } else {
                res.json(users);
        }
});

// Get user by ID
app.get('/users/:id', (req, res) => {
        const { id } = req.params;
        const user = users.find(u => u.id === parseInt(id));

        if (user) {
                res.json(user);
        } else {
                res.status(404).json({ error: 'User not found' });
        }
});

// Get all doctors
app.get('/doctors', (req, res) => {
        res.json(doctors);
});

// Get doctor by ID
app.get('/doctors/:id', (req, res) => {
        const { id } = req.params;
        const doctor = doctors.find(d => d.id === parseInt(id));

        if (doctor) {
                res.json(doctor);
        } else {
                res.status(404).json({ error: 'Doctor not found' });
        }
});

// Create new user (for registration)
app.post('/users', (req, res) => {
        const { email, name, role, photoURL } = req.body;

        // Check if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
                return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = {
                id: users.length + 1,
                email,
                name,
                role: role || 'patient',
                photoURL: photoURL || null
        };

        users.push(newUser);
        res.status(201).json(newUser);
});

// Update user
app.put('/users/:id', (req, res) => {
        const { id } = req.params;
        const userIndex = users.findIndex(u => u.id === parseInt(id));

        if (userIndex === -1) {
                return res.status(404).json({ error: 'User not found' });
        }

        users[userIndex] = { ...users[userIndex], ...req.body };
        res.json(users[userIndex]);
});

// Health check
app.get('/health', (req, res) => {
        res.json({
                status: 'OK',
                message: 'Mock API server is running',
                timestamp: new Date().toISOString()
        });
});

// Error handling middleware
app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
        res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
        console.log(`🚀 Mock API server running on http://localhost:${PORT}`);
        console.log(`📋 Available endpoints:`);
        console.log(`   GET  /health - Health check`);
        console.log(`   GET  /users - Get all users`);
        console.log(`   GET  /users?email=xxx - Get user by email`);
        console.log(`   GET  /users/:id - Get user by ID`);
        console.log(`   POST /users - Create new user`);
        console.log(`   PUT  /users/:id - Update user`);
        console.log(`   GET  /doctors - Get all doctors`);
        console.log(`   GET  /doctors/:id - Get doctor by ID`);
});

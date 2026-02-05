
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory Database (The "Database")
let db = {
  products: [
    {
      id: '1',
      name: 'Vortex Quantum Headphones',
      description: 'Immersive noise-cancelling wireless headphones with superior audio drivers and plush memory foam.',
      price: 24999.00,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
      stock: 15,
      featured: true,
      reviews: []
    },
    {
      id: '2',
      name: 'Nebula Smart Watch Gen 5',
      description: 'Elegant titanium finish with advanced health monitoring and built-in GPS.',
      price: 29900.00,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
      stock: 8,
      featured: true,
      reviews: []
    },
    {
      id: '12',
      name: 'Titan Gaming Laptop',
      description: 'Ultimate performance with the latest GPU and high-refresh-rate display.',
      price: 189999.00,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=600',
      stock: 4,
      featured: true,
      reviews: []
    }
  ],
  orders: [
    {
      id: 'ORD-7090',
      customerName: 'Yashu Admin',
      email: 'yashu70902@gmail.com',
      phone: '7090292677',
      shippingAddress: '123 AI Lane, Tech Park',
      city: 'Bengaluru',
      zipCode: '560001',
      items: [],
      total: 189999.00,
      status: 'Processing',
      date: '2024-03-25'
    }
  ],
  users: [
    {
      id: 'U-001',
      name: 'Yashu Admin',
      email: 'yashu70902@gmail.com',
      phone: '7090292677',
      password: 'Yashu@143',
      role: 'ADMIN',
      createdAt: '2024-01-10',
      addresses: [
        { id: 'a1', label: 'Main Office', street: '123 AI Lane, Tech Park', city: 'Bengaluru', zipCode: '560001', isDefault: true }
      ]
    }
  ]
};

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'online', timestamp: new Date().toISOString(), region: 'Render Global' });
});

// Products API
app.get('/products', (req, res) => res.json(db.products));
app.post('/products', (req, res) => {
  const newProduct = { ...req.body, id: Date.now().toString() };
  db.products.unshift(newProduct);
  res.status(201).json(newProduct);
});
app.put('/products/:id', (req, res) => {
  db.products = db.products.map(p => p.id === req.params.id ? { ...req.body, id: p.id } : p);
  res.json(req.body);
});
app.delete('/products/:id', (req, res) => {
  db.products = db.products.filter(p => p.id !== req.params.id);
  res.status(204).send();
});

// Orders API
app.get('/orders', (req, res) => res.json(db.orders));
app.post('/orders', (req, res) => {
  const newOrder = { 
    ...req.body, 
    id: `ORD-${Math.floor(Math.random() * 9000) + 1000}`, 
    date: new Date().toISOString().split('T')[0] 
  };
  db.orders.unshift(newOrder);
  res.status(201).json(newOrder);
});
app.patch('/orders/:id', (req, res) => {
  db.orders = db.orders.map(o => o.id === req.params.id ? { ...o, ...req.body } : o);
  const updated = db.orders.find(o => o.id === req.params.id);
  res.json(updated);
});

// Users API (Admin Management)
app.get('/users', (req, res) => res.json(db.users));
app.post('/users', (req, res) => {
  const newUser = { ...req.body, id: `U-${Date.now()}`, createdAt: new Date().toISOString().split('T')[0] };
  db.users.push(newUser);
  res.status(201).json(newUser);
});
app.put('/users/:id', (req, res) => {
  db.users = db.users.map(u => u.id === req.params.id ? { ...req.body, id: u.id } : u);
  res.json(req.body);
});
app.delete('/users/:id', (req, res) => {
  db.users = db.users.filter(u => u.id !== req.params.id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`GS Backend Engine with Admin Protocol running on port ${PORT}`);
});

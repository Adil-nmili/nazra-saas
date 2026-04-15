const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const connectDB = require('../config/db');

// Import models
const User = require('../models/User');
const Client = require('../models/Client');
const Plan = require('../models/Plan');
const Company = require('../models/Company');
const Invoice = require('../models/Invoice');
const Compte = require('../models/Compte');

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Client.deleteMany();
    await Plan.deleteMany();
    await Company.deleteMany();
    await Invoice.deleteMany();
    await Compte.deleteMany();

    console.log('Data cleared...');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@superdashboard.com',
      password: 'admin123',
      role: 'admin',
    });

    console.log('Admin user created:', adminUser.email);

    // Create sample clients
    const clients = await Client.create([
      {
        name: 'Acme Corporation',
        email: 'contact@acme.com',
        phone: '+1 555-0100',
        company: 'Acme Corp',
        segment: 'enterprise',
        status: 'active',
        address: {
          street: '123 Enterprise Way',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA',
        },
        notes: 'Key enterprise client since 2020',
        createdBy: adminUser._id,
      },
      {
        name: 'Tech Startup Inc',
        email: 'hello@techstartup.com',
        phone: '+1 555-0101',
        company: 'Tech Startup',
        segment: 'startup',
        status: 'active',
        address: {
          street: '456 Innovation Blvd',
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94102',
          country: 'USA',
        },
        notes: 'Fast-growing tech startup',
        createdBy: adminUser._id,
      },
      {
        name: 'Local Business LLC',
        email: 'info@localbusiness.com',
        phone: '+1 555-0102',
        company: 'Local Business',
        segment: 'business',
        status: 'active',
        address: {
          street: '789 Main Street',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
          country: 'USA',
        },
        createdBy: adminUser._id,
      },
      {
        name: 'Global Industries',
        email: 'sales@globalind.com',
        phone: '+1 555-0103',
        company: 'Global Industries Inc',
        segment: 'enterprise',
        status: 'active',
        address: {
          street: '100 Corporate Plaza',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90001',
          country: 'USA',
        },
        notes: 'International enterprise client',
        createdBy: adminUser._id,
      },
      {
        name: 'Fresh Ventures',
        email: 'team@freshventures.io',
        phone: '+1 555-0104',
        company: 'Fresh Ventures',
        segment: 'startup',
        status: 'pending',
        address: {
          street: '222 Startup Lane',
          city: 'Austin',
          state: 'TX',
          zipCode: '78701',
          country: 'USA',
        },
        notes: 'New startup in onboarding phase',
        createdBy: adminUser._id,
      },
      {
        name: 'Smith Consulting',
        email: 'john@smithconsulting.com',
        phone: '+1 555-0105',
        company: 'Smith Consulting',
        segment: 'individual',
        status: 'active',
        address: {
          street: '55 Freelance Ave',
          city: 'Miami',
          state: 'FL',
          zipCode: '33101',
          country: 'USA',
        },
        createdBy: adminUser._id,
      },
      {
        name: 'Downtown Retail',
        email: 'manager@downtownretail.com',
        phone: '+1 555-0106',
        company: 'Downtown Retail Co',
        segment: 'business',
        status: 'inactive',
        address: {
          street: '888 Commerce St',
          city: 'Seattle',
          state: 'WA',
          zipCode: '98101',
          country: 'USA',
        },
        notes: 'Account inactive - renewal pending',
        createdBy: adminUser._id,
      },
      {
        name: 'NextGen Solutions',
        email: 'info@nextgensolutions.com',
        phone: '+1 555-0107',
        company: 'NextGen Solutions Ltd',
        segment: 'startup',
        status: 'active',
        address: {
          street: '321 Tech Park',
          city: 'Boston',
          state: 'MA',
          zipCode: '02101',
          country: 'USA',
        },
        createdBy: adminUser._id,
      },
    ]);

    console.log('Sample clients created:', clients.length);

    // Create plans
    const plans = await Plan.create([
      {
        name: 'Free',
        description: 'Basic features for individuals',
        price: 0,
        billingCycle: 'monthly',
        features: ['Up to 5 clients', 'Basic reporting', 'Email support'],
        maxUsers: 1,
        maxStorage: 1,
        tier: 'free',
      },
      {
        name: 'Professional',
        description: 'Advanced features for growing businesses',
        price: 29,
        billingCycle: 'monthly',
        features: ['Unlimited clients', 'Advanced reporting', 'Priority support', 'API access'],
        maxUsers: 5,
        maxStorage: 10,
        tier: 'professional',
      },
      {
        name: 'Enterprise',
        description: 'Full features for large organizations',
        price: 99,
        billingCycle: 'monthly',
        features: ['Everything in Professional', 'Custom integrations', 'Dedicated support', 'SLA guarantee'],
        maxUsers: -1,
        maxStorage: 100,
        tier: 'enterprise',
      },
    ]);

    console.log('Plans created:', plans.length);

    // Create company info
    const company = await Company.create({
      name: 'SuperDashboard Inc',
      email: 'contact@superdashboard.com',
      phone: '+1 555-DASH',
      website: 'https://superdashboard.com',
      address: {
        street: '123 Dashboard Street',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102',
        country: 'USA',
      },
      currency: 'USD',
      timezone: 'America/Los_Angeles',
    });

    console.log('Company info created:', company.name);

    // Create sample comptes (accounts)
    const comptes = await Compte.create([
      {
        accountNumber: 'ACC-001-CHK',
        name: 'Acme Main Checking',
        type: 'checking',
        balance: 125000.50,
        currency: 'USD',
        client: clients[0]._id,
        status: 'active',
        openedDate: new Date('2023-01-15'),
        lastTransaction: new Date('2024-02-01'),
      },
      {
        accountNumber: 'ACC-001-SAV',
        name: 'Acme Savings',
        type: 'savings',
        balance: 500000.00,
        currency: 'USD',
        client: clients[0]._id,
        status: 'active',
        openedDate: new Date('2023-01-15'),
        lastTransaction: new Date('2024-01-20'),
      },
      {
        accountNumber: 'ACC-002-BUS',
        name: 'Tech Startup Business',
        type: 'business',
        balance: 75000.25,
        currency: 'USD',
        client: clients[1]._id,
        status: 'active',
        openedDate: new Date('2023-06-01'),
        lastTransaction: new Date('2024-02-05'),
      },
      {
        accountNumber: 'ACC-002-INV',
        name: 'Tech Startup Investment',
        type: 'investment',
        balance: 250000.00,
        currency: 'USD',
        client: clients[1]._id,
        status: 'active',
        openedDate: new Date('2023-08-15'),
        lastTransaction: new Date('2024-01-30'),
      },
      {
        accountNumber: 'ACC-003-CHK',
        name: 'Local Business Checking',
        type: 'checking',
        balance: 45000.75,
        currency: 'USD',
        client: clients[2]._id,
        status: 'active',
        openedDate: new Date('2023-03-10'),
        lastTransaction: new Date('2024-02-03'),
      },
      {
        accountNumber: 'ACC-003-SAV',
        name: 'Local Business Reserve',
        type: 'savings',
        balance: 80000.00,
        currency: 'USD',
        client: clients[2]._id,
        status: 'inactive',
        openedDate: new Date('2023-03-10'),
        lastTransaction: new Date('2023-12-15'),
      },
      {
        accountNumber: 'ACC-004-FRZ',
        name: 'Frozen Account Example',
        type: 'checking',
        balance: 5000.00,
        currency: 'USD',
        client: clients[0]._id,
        status: 'frozen',
        openedDate: new Date('2022-01-01'),
        lastTransaction: new Date('2023-06-01'),
      },
    ]);

    console.log('Sample comptes created:', comptes.length);

    // Create sample invoices
    const invoices = await Invoice.create([
      {
        invoiceNumber: 'INV-000001',
        client: clients[0]._id,
        items: [
          { description: 'Web Development Services', quantity: 40, unitPrice: 150, amount: 6000 },
          { description: 'UI/UX Design', quantity: 20, unitPrice: 120, amount: 2400 },
        ],
        subtotal: 8400,
        taxRate: 20,
        tax: 1680,
        discount: 0,
        total: 10080,
        currency: 'USD',
        status: 'paid',
        issueDate: new Date('2024-01-10'),
        dueDate: new Date('2024-02-10'),
        paidDate: new Date('2024-02-05'),
        notes: 'Thank you for your business!',
        createdBy: adminUser._id,
      },
      {
        invoiceNumber: 'INV-000002',
        client: clients[1]._id,
        items: [
          { description: 'Monthly Hosting Package', quantity: 12, unitPrice: 99, amount: 1188 },
          { description: 'SSL Certificate', quantity: 1, unitPrice: 150, amount: 150 },
        ],
        subtotal: 1338,
        taxRate: 20,
        tax: 267.6,
        discount: 50,
        total: 1555.6,
        currency: 'USD',
        status: 'pending',
        issueDate: new Date('2024-01-25'),
        dueDate: new Date('2024-02-25'),
        notes: 'Annual hosting and security package',
        createdBy: adminUser._id,
      },
      {
        invoiceNumber: 'INV-000003',
        client: clients[2]._id,
        items: [
          { description: 'E-commerce Platform Setup', quantity: 1, unitPrice: 5000, amount: 5000 },
          { description: 'Payment Gateway Integration', quantity: 1, unitPrice: 800, amount: 800 },
          { description: 'Inventory System', quantity: 1, unitPrice: 1200, amount: 1200 },
        ],
        subtotal: 7000,
        taxRate: 20,
        tax: 1400,
        discount: 500,
        total: 7900,
        currency: 'USD',
        status: 'sent',
        issueDate: new Date('2024-02-01'),
        dueDate: new Date('2024-03-01'),
        notes: 'Complete e-commerce solution',
        createdBy: adminUser._id,
      },
      {
        invoiceNumber: 'INV-000004',
        client: clients[0]._id,
        items: [
          { description: 'Mobile App Development - Phase 1', quantity: 80, unitPrice: 125, amount: 10000 },
        ],
        subtotal: 10000,
        taxRate: 20,
        tax: 2000,
        discount: 0,
        total: 12000,
        currency: 'USD',
        status: 'overdue',
        issueDate: new Date('2023-12-01'),
        dueDate: new Date('2024-01-01'),
        notes: 'Phase 1 of mobile application development',
        createdBy: adminUser._id,
      },
      {
        invoiceNumber: 'INV-000005',
        client: clients[1]._id,
        items: [
          { description: 'SEO Optimization', quantity: 1, unitPrice: 800, amount: 800 },
          { description: 'Content Writing (10 articles)', quantity: 10, unitPrice: 50, amount: 500 },
        ],
        subtotal: 1300,
        taxRate: 20,
        tax: 260,
        discount: 0,
        total: 1560,
        currency: 'USD',
        status: 'draft',
        issueDate: new Date('2024-02-05'),
        dueDate: new Date('2024-03-05'),
        notes: 'Marketing package - draft',
        createdBy: adminUser._id,
      },
      {
        invoiceNumber: 'INV-000006',
        client: clients[2]._id,
        items: [
          { description: 'Consulting Services', quantity: 8, unitPrice: 200, amount: 1600 },
        ],
        subtotal: 1600,
        taxRate: 20,
        tax: 320,
        discount: 0,
        total: 1920,
        currency: 'USD',
        status: 'cancelled',
        issueDate: new Date('2024-01-15'),
        dueDate: new Date('2024-02-15'),
        notes: 'Cancelled by client request',
        createdBy: adminUser._id,
      },
    ]);

    console.log('Sample invoices created:', invoices.length);

    console.log('\n✅ Seed data created successfully!');
    console.log('\nDefault admin credentials:');
    console.log('Email: admin@superdashboard.com');
    console.log('Password: admin123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();

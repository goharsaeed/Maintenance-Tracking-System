# React Coding Challenge

## Overview
Create a simple maintenance tracking system that allows technicians to log maintenance activities on equipment and visualize basic maintenance metrics.

## Time Frame and Submission
- Submit as a public GitHub repository
- Use clear, descriptive commit messages throughout development

## Phase 1 (Required)

### Technical Requirements
- Next.js with TypeScript
- Tailwind CSS for styling
- Tanstack Table
- Recharts for visualization
- Zod for form validation
- Playwright for E2E testing

### Core Features

#### 1. Equipment Management
```typescript
interface Equipment {
  id: string;
  name: string;
  location: string;
  department: 'Machining' | 'Assembly' | 'Packaging' | 'Shipping';
  model: string;
  serialNumber: string;
  installDate: Date;
  status: 'Operational' | 'Down' | 'Maintenance' | 'Retired';
}
```

#### 2. Maintenance Records
```typescript
interface MaintenanceRecord {
  id: string;
  equipmentId: string;
  date: Date;
  type: 'Preventive' | 'Repair' | 'Emergency';
  technician: string;
  hoursSpent: number;
  description: string;
  partsReplaced?: string[];
  priority: 'Low' | 'Medium' | 'High';
  completionStatus: 'Complete' | 'Incomplete' | 'Pending Parts';
}
```

#### 3. Required Features

##### Equipment Form
Create a form with Zod validation:
- Name (required, min 3 chars)
- Location (required)
- Department (dropdown from enum)
- Model (required)
- Serial Number (required, alphanumeric)
- Install Date (required, must be past date)
- Status (dropdown from enum)

##### Maintenance Record Form
Create a form with Zod validation:
- Equipment (dropdown selection, required)
- Date (required, not future date)
- Type (dropdown from enum)
- Technician (required, min 2 chars)
- Hours Spent (required, positive number, max 24)
- Description (required, min 10 chars)
- Parts Replaced (optional, dynamic array of strings)
- Priority (dropdown from enum)
- Completion Status (dropdown from enum)

##### Equipment Table
- Display all equipment with columns for all fields
- Implement sorting and filtering
- Add status-based row coloring
- Enable bulk status updates

##### Maintenance Records Table
- Show all maintenance records
- Include equipment name (joined from equipment data)
- Implement sorting and filtering
- Group by equipment option

##### Dashboard
Create a simple dashboard with:
- Equipment status breakdown (pie chart)
- Maintenance hours by department (bar chart)
- Recent maintenance activities

#### 4. Required Tests
Implement the following E2E tests using Playwright:

```typescript
// Equipment Management Tests
- Should create new equipment with valid data
- Should show validation errors for invalid equipment data
- Should edit existing equipment
- Should filter equipment table

// Maintenance Record Tests
- Should create new maintenance record
- Should validate maintenance hours (reject negative/over 24)
- Should show equipment name in maintenance table
- Should filter maintenance records by date range
```

## Phase 2 (Extra Credit)

### Database Integration
- Set up a simple SQL database with two tables
- Implement Prisma schema
- Create basic CRUD endpoints
- Include proper relationships

### Reporting
Add ability to:
- Generate a PDF maintenance report for selected equipment
- Include maintenance history
- Show total maintenance hours
- Format tables nicely for printing

## Submission Requirements

### Documentation
README.md must include:
1. Setup Instructions
   - Prerequisites
   - Installation steps
   - How to run the application
   - How to run tests

2. Features Implementation
   - List of completed features
   - Screenshots of key features (optional)
   - API endpoints (if Phase 2 completed)

3. Testing Approach
   - Testing strategy
   - What is tested and why
   - How to run different types of tests

4. Technical Decisions
   - Key libraries used and why
   - Architecture decisions
   - State management approach

5. Known Issues/Limitations
   - Current bugs or limitations
   - Future improvements

6. Bonus Features (if implemented)
   - Description of extra features
   - How to use them

## Tips for Success
- ✅ Complete required features before attempting bonus features
- ✅ Write clear, maintainable tests
- ✅ Use TypeScript effectively
- ✅ Handle error cases
- ✅ Keep code organization clean
- ✅ Use meaningful component names
- ✅ Include loading states
- ✅ Make commit messages descriptive
- ✅ Don't overengineer - simple solutions are preferred

## Evaluation Criteria

### Code Quality (40%)
- TypeScript usage
- Code organization
- Error handling
- Component composition
- Form validation

### Functionality (30%)
- Feature completeness
- Data management
- Search/filter implementation
- Chart functionality

### Testing (20%)
- Test coverage
- Test organization
- Test reliability
- Error cases covered

### Documentation (10%)
- README clarity
- Code comments
- Commit messages
- Setup instructions

I'd suggest not relying on ChatGPT and other LLMs too much as you'll need to prove your knowledge of the technologies you choose in the technical part of the interview. This tends not to go well for people who relied on ChatGPT too heavily.

If you can't complete the required portion within a reasonable amount of time (a couple weeks), feel free to submit what you got done. Something is better than nothing and I'm mainly looking for people who are willing to research and put in the effort to solve a problem they've never seen before.
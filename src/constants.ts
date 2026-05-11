/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UseCase } from './types';

export const DEPARTMENTS = [
  'HR', 'IT', 'Marketing', 'Sales', 'Finance', 'Operations', 'Customer Support'
] as const;

export const CATALOG_DATA: UseCase[] = [
  {
    id: "hr-001",
    title: "Job Description and Interview Kit Generator",
    department: "HR",
    description: "Generate role-specific job descriptions, screening questions, interview guides, and scorecards from a hiring request.",
    painPoint: "HR and hiring managers spend too much time drafting role materials from scratch, and quality varies across teams.",
    benefit: "Faster hiring preparation, more consistent candidate evaluation, and better alignment between HR and business stakeholders.",
    kpis: ["Time to post job opening", "Recruiter productivity", "Interview quality"],
    complexity: "Low"
  },
  {
    id: "hr-002",
    title: "Employee Policy Q&A Assistant",
    department: "HR",
    description: "Answers employee questions using company policies, HR FAQs, benefits guides, and employee handbooks.",
    painPoint: "HR teams repeatedly answer the same policy questions, while employees struggle to find accurate information.",
    benefit: "Reduced HR support load, faster employee self-service, and more consistent policy interpretation.",
    kpis: ["HR ticket volume", "Response time", "Employee satisfaction"],
    complexity: "Medium"
  },
  {
    id: "hr-003",
    title: "Performance Review Drafting Assistant",
    department: "HR",
    description: "Help managers draft performance review comments, development feedback, and goal summaries based on structured inputs.",
    painPoint: "Managers often delay reviews because writing fair, specific, and constructive feedback takes time.",
    benefit: "Faster review completion, better feedback quality, and more consistent tone across managers.",
    kpis: ["Review completion rate", "Cycle time", "Feedback quality scores"],
    complexity: "Low"
  },
  {
    id: "it-001",
    title: "IT Ticket Triage and Resolution Assistant",
    department: "IT",
    description: "Classify incoming IT tickets, suggest priority, identify likely root causes, and recommend resolution steps.",
    painPoint: "IT teams spend significant time manually sorting tickets and responding to repetitive issues.",
    benefit: "Faster ticket routing, improved first-contact resolution, and reduced workload for IT support teams.",
    kpis: ["First response time", "Resolution time", "SLA compliance"],
    complexity: "Medium"
  },
  {
    id: "it-002",
    title: "Knowledge Base Article Generator",
    department: "IT",
    description: "Convert resolved tickets, support notes, and troubleshooting steps into clear knowledge base articles.",
    painPoint: "IT knowledge bases are often outdated because documentation is treated as extra work after issue resolution.",
    benefit: "Better self-service, faster onboarding of support agents, and lower repeat ticket volume.",
    kpis: ["Knowledge base coverage", "Self-service deflection rate", "Agent onboarding time"],
    complexity: "Low"
  },
  {
    id: "marketing-001",
    title: "Campaign Brief Generator",
    department: "Marketing",
    description: "Generate campaign briefs, audience segments, key messages, content ideas, and channel plans from a marketing objective.",
    painPoint: "Teams spend a lot of time turning high-level goals into clear campaign plans and creative direction.",
    benefit: "Faster campaign planning, more consistent messaging, and better alignment between marketing, sales, and creative teams.",
    kpis: ["Campaign planning cycle time", "Content output volume", "Campaign launch speed"],
    complexity: "Low"
  },
  {
    id: "marketing-002",
    title: "Content Repurposing Assistant",
    department: "Marketing",
    description: "Transform long-form content into social posts, email snippets, blog summaries, sales enablement copy, and newsletter content.",
    painPoint: "Valuable content is underused because adapting it for different channels is time-consuming.",
    benefit: "Higher content reuse, faster publishing, and more consistent brand messaging across channels.",
    kpis: ["Content production time", "Publishing frequency", "Engagement rate"],
    complexity: "Low"
  },
  {
    id: "sales-001",
    title: "Account Research and Meeting Prep Assistant",
    department: "Sales",
    description: "Generate account briefs, stakeholder profiles, discovery questions, and meeting talking points before sales calls.",
    painPoint: "Sales reps spend too much time researching accounts manually or enter meetings underprepared.",
    benefit: "Better discovery conversations, improved personalization, and higher seller productivity.",
    kpis: ["Meeting preparation time", "Opportunity conversion rate", "Win rate"],
    complexity: "Low"
  },
  {
    id: "sales-002",
    title: "Proposal and Follow-Up Email Assistant",
    department: "Sales",
    description: "Draft personalized follow-up emails, proposal summaries, objection responses, and next-step messages from meeting notes.",
    painPoint: "Sales momentum slows when follow-ups are delayed or generic.",
    benefit: "Faster response times, more personalized communication, and improved deal progression.",
    kpis: ["Follow-up turnaround time", "Response rate", "Sales cycle length"],
    complexity: "Low"
  },
  {
    id: "finance-001",
    title: "Budget Variance Commentary Assistant",
    department: "Finance",
    description: "Draft plain-language explanations for budget vs. actual variances using finance data and business context.",
    painPoint: "Finance teams spend time manually explaining recurring variances for reports and business reviews.",
    benefit: "Faster management reporting, clearer business narratives, and better decision support.",
    kpis: ["Reporting cycle time", "Variance explanation quality", "Finance productivity"],
    complexity: "Medium"
  },
  {
    id: "finance-002",
    title: "Financial Report Executive Summary Generator",
    department: "Finance",
    description: "Turn financial reports, dashboards, or spreadsheet outputs into executive-ready summaries, risks, and recommended actions.",
    painPoint: "Leaders need concise insights, but finance teams spend time converting numbers into narratives.",
    benefit: "Faster executive reporting, clearer insights, and better management decision-making.",
    kpis: ["Report preparation time", "Executive satisfaction", "Decision turnaround time"],
    complexity: "Low"
  },
  {
    id: "ops-001",
    title: "Standard Operating Procedure Generator",
    department: "Operations",
    description: "Convert process notes, videos, checklists, or SME inputs into clear SOPs, work instructions, and training guides.",
    painPoint: "Operational knowledge is often informal, inconsistent, or locked in the heads of experienced employees.",
    benefit: "Faster documentation, better process consistency, and easier onboarding.",
    kpis: ["SOP coverage", "Onboarding time", "Process compliance"],
    complexity: "Low"
  },
  {
    id: "support-001",
    title: "Customer Support Response Assistant",
    department: "Customer Support",
    description: "Draft accurate, empathetic, and policy-aligned responses to customer inquiries using support knowledge and past examples.",
    painPoint: "Support agents spend time writing repetitive replies while trying to maintain quality and tone.",
    benefit: "Faster responses, more consistent service quality, and improved agent productivity.",
    kpis: ["First response time", "Average handle time", "Customer satisfaction"],
    complexity: "Low"
  },
  {
    id: "support-002",
    title: "Support Ticket Summarizer and Escalation Assistant",
    department: "Customer Support",
    description: "Summarize long ticket histories, identify customer sentiment, extract key facts, and recommend escalation when needed.",
    painPoint: "Agents and managers waste time reading long threads before deciding what to do next.",
    benefit: "Faster escalations, improved handoffs, and reduced risk of missing important customer context.",
    kpis: ["Escalation time", "Resolution time", "SLA compliance"],
    complexity: "Low"
  }
];

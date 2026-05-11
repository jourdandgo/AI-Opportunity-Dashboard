/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Complexity = 'Low' | 'Medium' | 'High';
export type Department = 'HR' | 'IT' | 'Marketing' | 'Sales' | 'Finance' | 'Operations' | 'Customer Support' | 'All';
export type Recommendation = 'Pursue' | 'Pilot' | 'Refine' | 'Park';

export interface UseCase {
  id: string;
  title: string;
  department: Department;
  description: string;
  painPoint: string;
  benefit: string;
  kpis: string[];
  complexity: Complexity;
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  department: Department;
  notes?: string;
  reach: number;
  impact: number;
  feasibility: number;
  totalScore: number;
  recommendation: Recommendation;
  createdAt: number;
}

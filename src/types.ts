export type Page = 'login' | 'predictions' | 'simulations' | 'metrics';

export interface User {
  username: string;
  role: string;
  avatar: string;
}

export interface PredictionData {
  applicantIncome: number;
  coapplicantIncome: number;
  loanAmount: number;
  loanTerm: string;
  creditHistory: 'positive' | 'negative';
}

export interface SimulationParams {
  jitter: number;
  drift: number;
  perturbation: number;
}

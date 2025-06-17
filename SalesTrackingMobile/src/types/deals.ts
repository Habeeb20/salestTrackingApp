export interface Deal {
  _id: string;
  title: string;
  stage: 'Prospecting' | 'Qualification' | 'Negotiation' | 'Closed';
  value: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
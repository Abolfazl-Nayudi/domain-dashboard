export interface DomainDataType {
  id: string;
  domain: string;
  isActive: boolean;
  status: "pending" | "verified" | "rejected";
  createdDate: number;
}

export type SortByCriteriaType = "asc" | "desc";

export type DomainFormType = "add" | "edit";

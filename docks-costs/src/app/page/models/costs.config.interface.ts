export interface Categories {
    daCurrency: {
        currency: string;
    };
    baseCurrency: BaseCurrency;
    costs: Cost[];
}

export interface BaseCurrency {
    currency: string;
    exchangeRate: number;
}

export interface Cost {
    id: number;
    name: string;
    displayOrder: number;
    costItems: CostItem[];
}

export interface CostItem {
    id: number;
    name: string;
    costItemAlias: {
        accountingCode: string;
    };
    annotation: {
        id: number;
        name: string;
    };
    costs: CostItemDetails[];
    comments: CommentDetails[]; 
}

export interface CostItemDetails {
    daStage: string;
    persona: string;
    type: string;
    amount: number;
}

export interface CommentDetails {
    id: number;
    daStage: string;
    persona: string;
    author: string;
    comment: string;
    type: string;
    date: string;
  }
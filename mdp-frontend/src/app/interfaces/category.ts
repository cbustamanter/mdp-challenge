export interface Category {
    _id: string,
    category_cod: string,
    category_desc: string,
    category_name: string,
    created_at: Date,
    updated_at: Date,
}

export interface categoryData {
    category: Category;
}
  
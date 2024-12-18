import CategoryEntity from "@/entities/Category.entity";
import {
  Category,
  MutationCreateCategoryArgs,
  MutationDeleteCategoryArgs,
  MutationUpdateCategoryArgs,
  QueryFindCategoryArgs,
} from "@/generated/graphql";
import CategoryService from "@/services/category.service";

export default {
  Query: {
    categories: async (): Promise<CategoryEntity[]> => {
      const categoriesList = await new CategoryService().listCategories();

      return categoriesList;
    },
    findCategory: async (
      _: any,
      { data }: QueryFindCategoryArgs
    ): Promise<CategoryEntity> => {
      const category = await new CategoryService().findCategoryById({
        id: data.id,
        limit: data?.limit,
      });
      return category;
    },
  },
  Mutation: {
    createCategory: async (
      _: any,
      { data }: MutationCreateCategoryArgs
    ): Promise<CategoryEntity> => {
      const newCategory = await new CategoryService().create(data);
      return newCategory;
    },
    updateCategory: async (
      _: any,
      { data }: MutationUpdateCategoryArgs
    ): Promise<CategoryEntity> => {
      const categoryUpdate = await new CategoryService().update(data.id, {
        title: data.title,
      });

      return categoryUpdate;
    },
    deleteCategory: async (
      _: any,
      { id }: MutationDeleteCategoryArgs
    ): Promise<string> => {
      const categoryDelete = await new CategoryService().delete(id);
      return `La catégorie ${categoryDelete} a bien était supprimée`;
    },
  },
};


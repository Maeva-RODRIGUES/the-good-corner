import TagEntity from "@/entities/Tag.entity";
import {
  MutationCreateTagArgs,
  MutationDeleteTagArgs,
  MutationUpdateTagArgs,
  QueryFindTagArgs,
} from "@/generated/graphql";
import TagService from "@/services/tag.service";
import { TagCreateType } from "@/types/tags";

export default {
  Query: {
    tags: async (): Promise<TagEntity[]> => {
      const tagsList = await new TagService().listTags();
      return tagsList;
    },
    findTag: async (_: any, { id }: QueryFindTagArgs): Promise<TagEntity> => {
      const tag = await new TagService().findTagById(id);
      return tag;
    },
  },
  Mutation: {
    createTag: async (
      _: any,
      { data }: MutationCreateTagArgs
    ): Promise<TagEntity> => {
      const newTag = await new TagService().create(data);
      return newTag;
    },
    updateTag: async (
      _: any,
      { data }: MutationUpdateTagArgs
    ): Promise<TagEntity> => {
      const tagUpdate = await new TagService().update(data.id, {
        label: data.label,
      });
      return tagUpdate;
    },
    deleteTag: async (_: any, { id }: MutationDeleteTagArgs): Promise<string> => {
      const tagDelete = await new TagService().delete(id);

      return `Le tag ${tagDelete} a bien était supprimé`;
    },
  },
};

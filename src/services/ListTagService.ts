import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";
import { classToPlain } from 'class-transformer' // ela vai na minha entity de Tag e vai criar novos objetos a partirdo que eu ja tenho


class ListTagService {
  async execute() {
    const tagsRepositories = getCustomRepository(TagsRepositories)

    let tags = await tagsRepositories.find();

    return classToPlain(tags);
  }
}

export default ListTagService
import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Comment } from './entities/comment.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const listing = new Listing({
      // need to create a listing object to pass into item, if not Listing entity will not be created, which results in ListingDB not updated
      ...createItemDto.listing,
      rating: 0,
    });
    const tags = createItemDto.tags.map(
      // need to create a tag object to pass into item, if not Tag entity will not be created, which results in TagDB not updated
      (createTagDto) => new Tag(createTagDto),
    );
    const item = new Item({
      ...createItemDto,
      comments: [],
      tags,
      listing,
    });
    await this.entityManager.save(item);
  }

  async findAll() {
    return this.itemsRepository.find({
      relations: {
        listing: true, //to populate listing
        // comments: true, //can also populate comments
        // tags: true, //to populate tags
      },
    });
  }

  async findOne(id: number) {
    return this.itemsRepository.findOne({
      where: { id },
      relations: {
        listing: true, //to populate listing
        comments: true, //to populate comments
        tags: true, //to populate tags
      },
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemsRepository.findOneBy({ id });
    item.public = updateItemDto.public;
    const comments = updateItemDto.comments.map(
      // need to create a comments object to pass into item, if not Comment entity will not be created, which results in CommentDB not updated
      (createCommentDto) => new Comment(createCommentDto),
    );
    item.comments = comments;
    await this.entityManager.save(item);

    // await this.entityManager.transaction(async (entityManager) => {
    //   const item = await this.itemsRepository.findOneBy({ id });
    //   item.public = updateItemDto.public;
    //   // const comments = updateItemDto.comments.map(
    //   //   (createCommentDto) => new Comment(createCommentDto),
    //   // );
    //   // item.comments = comments;
    //   await entityManager.save(item);
    //   const tagContent = `${Math.random()}`;
    //   const tag = new Tag({ content: tagContent });
    //   await entityManager.save(tag);
    // });
  }

  async remove(id: number) {
    await this.itemsRepository.delete(id);
  }
}

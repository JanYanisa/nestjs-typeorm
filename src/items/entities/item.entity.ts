import {
  Column,
  Entity,
  // JoinColumn,
  // JoinTable,
  // ManyToMany,
  // OneToMany,
  // OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
// import { Listing } from './listing.entity';
// import { AbstractEntity } from '../../database/abstract.entity';
// import { Comment } from './comment.entity';
// import { Tag } from './tag.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true })
  public: boolean;

  constructor(item: Partial<Item>) {
    Object.assign(this, item);
  }
  // @OneToOne(() => Listing, { cascade: true })
  // @JoinColumn()
  // listing: Listing;

  // @OneToMany(() => Comment, (comment) => comment.item, { cascade: true })
  // comments: Comment[];

  // @ManyToMany(() => Tag, { cascade: true })
  // @JoinTable()
  // tags: Tag[];
}

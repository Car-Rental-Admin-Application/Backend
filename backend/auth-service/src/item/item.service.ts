import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto, UpdateItemDto } from './dto/item.dto';

export interface Item {
  id: number;
  name: string;
}

@Injectable()
export class ItemService {
  private items: Item[] = [];
  private id = 1;

  findAll(): Item[] {
    return this.items;
  }

  findOne(id: number): Item {
    const item = this.items.find(i => i.id === id);
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  create(dto: CreateItemDto): Item {
    const item: Item = { id: this.id++, ...dto };
    this.items.push(item);
    return item;
  }

  update(id: number, dto: UpdateItemDto): Item {
    const item = this.findOne(id);
    Object.assign(item, dto);
    return item;
  }

  remove(id: number): void {
    const idx = this.items.findIndex(i => i.id === id);
    if (idx === -1) throw new NotFoundException('Item not found');
    this.items.splice(idx, 1);
  }
}
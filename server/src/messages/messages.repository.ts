import { readFile, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesRepository {
  async getData() {
    return await readFile('messages.json', 'utf8');
  }

  async writeDate(data) {
    await writeFile('messages.json', JSON.stringify(data));
  }

  async findOne(id: string) {
    const content = await this.getData();
    const messages = JSON.parse(content);
    return messages[id];
  }

  async findAll() {
    return JSON.parse(await this.getData());
  }

  async create(content: string) {
    const contents = JSON.parse(await this.getData());
    
    const id = Math.floor(Math.random() * 999);
    contents[id] = { id, content };
    await this.writeDate(contents);
  }
}

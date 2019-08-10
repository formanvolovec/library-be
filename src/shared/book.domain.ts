import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({ title: 'string', author: 'string' });
export const Book = mongoose.model('Book', schema, 'library');


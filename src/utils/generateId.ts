import { v4 } from 'uuid';
import { Guid } from '../@types/globals';

export const generateId = (): Guid => v4();

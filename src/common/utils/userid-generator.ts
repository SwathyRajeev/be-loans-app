import { customAlphabet } from 'nanoid/non-secure';

export function userIdGenerator(roles: number) {
  let prefix = '';

  switch (roles) {
    case 1:
      // * Master Admin
      prefix = 'MA';
      break;

    case 2:
      // Technical Admin
      prefix = 'TA';
      break;

    case 3:
      // Coordinator
      prefix = 'COR';
      break;

    case 4:
      // Coach
      prefix = 'COACH';
      break;

    case 5:
      // Student (Parent)
      prefix = 'STUDENT';
      break;

    default:
      break;
  }
  let nanoid = customAlphabet('1234567890', 5);
  let userId = `${prefix}_${nanoid()}`;

  return userId.toUpperCase();
}

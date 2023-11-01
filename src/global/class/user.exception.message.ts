import { ExceptionObjError } from '../enums/exception-obj-error.enum';
import { ExceptionObj } from '../interfaces/exception.obj';

export class UsersException {
	static USER_ACCOUNT_ALREADY_EXISTS: ExceptionObj = {
		message: '이미 회원가입 되어있는 계정입니다.',
		error: ExceptionObjError.BAD_REQUEST,
	};
}

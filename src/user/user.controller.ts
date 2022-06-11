import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ForbiddenException,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({ type: User })
  @ApiForbiddenResponse({ type: new ForbiddenException().message })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create({
      data: createUserDto,
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  @ApiOkResponse({ type: User })
  @ApiForbiddenResponse({ type: new ForbiddenException().message })
  @ApiNotFoundResponse({ type: new NotFoundException().message })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User | null> {
    const user = await this.userService.findOne({
      where: { id: +id },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
      },
    });
    if (user === null) {
      throw new NotFoundException('Not found');
    }
    return user;
  }
  @ApiOkResponse({ type: User })
  @ApiForbiddenResponse({ type: new ForbiddenException().message })
  @ApiNotFoundResponse({ type: new NotFoundException().message })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() data: UpdateUserDto,
  ): Promise<User | null> {
    try {
      return await this.userService.update({
        where: { id },
        data,
        select: {
          id: true,
          email: true,
          name: true,
          username: true,
        },
      });
    } catch (error) {
      if (
        'code' in error &&
        error.code === 'P2016' &&
        error.message.includes('RecordNotFound')
      ) {
        throw new NotFoundException('Not found');
      }
      throw error;
    }
  }

  @ApiOkResponse({ type: User })
  @ApiForbiddenResponse({ type: new ForbiddenException().message })
  @ApiNotFoundResponse({ type: new NotFoundException().message })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

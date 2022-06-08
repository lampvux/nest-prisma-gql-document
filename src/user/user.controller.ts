import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiCreatedResponse({ type: User })
  @ApiForbiddenResponse({ type: new ForbiddenException().message })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create({
      ...createUserDto,
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @ApiCreatedResponse({ type: User })
  @ApiForbiddenResponse({ type: new ForbiddenException().message })
  @ApiNotFoundResponse({ type: new NotFoundException().message })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne({ where: { id: id } });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

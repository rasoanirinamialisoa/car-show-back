import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateAdminDto {
    @ApiProperty()
    @IsEmail()
    Email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsStrongPassword()
    Password: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    Name: string;
}

export class UpdateAdminDto {
    @ApiProperty()
    @IsEmail()
    Email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsStrongPassword()
    Password: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    Name: string;
}

export class SignupAdminDto {
    @ApiProperty()
    @IsEmail()
    Email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsStrongPassword()
    Password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsStrongPassword()
    confirmPassword: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    Name: string;
}

export class SigninAdminDto {
    @ApiProperty()
    @IsEmail()
    Email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsStrongPassword()
    Password: string;
}

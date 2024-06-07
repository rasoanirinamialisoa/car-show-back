import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateImagesDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    url: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    carId: number;
}

export class UpdateImagesDto extends PartialType(CreateImagesDto) {}

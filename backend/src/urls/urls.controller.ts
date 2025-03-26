import { Controller, Post, Body, Get, Param, Res, HttpStatus, Query } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { Response } from 'express';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) { }

  @Post('shorten')
  async shorten(
    @Body('originalUrl') originalUrl: string,
    @Body('userId') userId: string
  ) {
    console.log('Original URL:', originalUrl);
    console.log('User ID:', userId);
  
    const result = await this.urlsService.shortenUrl(originalUrl, userId);
    console.log(result);
  
    return { shortUrl: result.shortUrl };
  }
  

  @Get('history/:userId')
  async getHistory(@Param('userId') userId: string, @Query('page') page = '1', @Query('limit') limit = '10') {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    return this.urlsService.getUrlHistory(userId, pageNumber, limitNumber);
  }

  @Get(':shortUrl')
  async redirect(@Param('shortUrl') shortUrl: string, @Res() res: Response) {
    const originalUrl = await this.urlsService.getOriginalUrl(shortUrl);
    res.redirect(HttpStatus.FOUND, originalUrl);
  }

}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LinkService {
  constructor(
    private config: ConfigService
  ) { }

  constructUrl(parts: Array<string>): string {
    const protocol = this.config.get('HTTP_PROTOCOL');
    const host = this.config.get('HTTP_HOST');

    return `${protocol}://${host}/${parts.join('/')}`
  }
}

import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';

export default () => (
  <ul>
    <li>
      <Link href="/a" as="/a">
        <Button>a</Button>
      </Link>
    </li>
    <li>
      <Link href="/b" as="/b">
        <Button>b</Button>
      </Link>
    </li>
    <li>
      <Link href="/cc" as="/cc">
        <Button>b</Button>
      </Link>
    </li>
  </ul>
);

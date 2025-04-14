
import { cn } from '@/lib/utils';

import Link from 'next/link';
import React from 'react'

const Header = ({headerTitle,TitleClassName}:{headerTitle?:string;TitleClassName:string}) => {

  return (
    <header>
      <div className='flex items-center justify-between'>
        {headerTitle?(
          <h1 className={cn('text-18 font-bold text-white-1 mb-4',TitleClassName)}>
            {headerTitle}
          </h1>
        ):(<div/>)}
        <Link href={`/discover`} className='text-orange-1 text-16 font-semibold'>See all</Link>
      </div>
    </header>
  )
}

export default Header
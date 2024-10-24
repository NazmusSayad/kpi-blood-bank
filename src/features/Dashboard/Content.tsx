import { cn } from '@/utils'
import { Button } from '@mui/material'

export default function Content({ items, loadMore, isLoading }: ContentProps) {
  return (
    <div>
      <div
        className={cn(
          'grid gap-3 content-center mb-6',
          'grid-cols-[repeat(auto-fit,minmax(auto,1fr))]',
          'xs:grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]'
        )}
      >
        {items.map((item) => (
          <div>
            <div className={'max-w-[28rem] mx-auto'}>{item}</div>
          </div>
        ))}
      </div>

      <div className={'mb-10'}>
        <div className={'flex justify-center'}>
          <Button
            color={'info'}
            onClick={loadMore}
            disabled={isLoading}
            variant={'contained'}
          >
            Load More
          </Button>
        </div>
      </div>
    </div>
  )
}

export type ContentProps = {
  items: any[]
  loadMore?: () => void
  isLoading?: boolean
}

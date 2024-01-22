import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface iProps {
  iteration: number
}
export default function Loading(props: iProps): JSX.Element {
  const { iteration = 5 } = props;
  const rows = [];
  for (let i = 0; i < iteration; i++) {
    rows.push(
      <div className="flex-1 leading-tight" key={i}>
        <Skeleton height={200} className="mb-4" />
        <Skeleton />
        <Skeleton width="80%" />
      </div>
      )
  } 
  return (
    <>
      <div style={{ fontSize: 20, lineHeight: 2 }} className="grid grid-cols-5 gap-4">
        {
          rows
        }
      </div>
    </>
  )
}
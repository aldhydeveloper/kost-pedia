interface iComp { 
  comp: JSX.Element[]
}
export default function WrapBudget({ comp }:iComp) {
  return (
    <div className="grid grid-cols-5 gap-8" key="lt3">
      {comp}
    </div>
  )
}
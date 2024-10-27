import Get from '@/service/get';
import Rooms, {iRoom, iKost}from '@/components/Product/Room'
const NewKosts = async () => {
    const resp = await Get(`${process.env.NEXT_PUBLIC_API_HOST}/landing/kosts`);

    // console.log(resp)
    if(!resp.success){
        return <> No Data.</>
    }

    return <>
    <div className="grid grid-cols-4 gap-8">
    {
        resp.data.map((v:iKost & {active_rooms:iRoom[]}) => {
            if(v.active_rooms.length == 0){
                return <></>
            }
            const room:iRoom = v.active_rooms[0];
            // console.log(room)
            return  <Rooms key={room.id} name={v.name} category={v.category} room={room} />
                    
        })
    }
    </div>;
    </>
}

export default NewKosts;
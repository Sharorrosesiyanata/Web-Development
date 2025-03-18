import {NextResponse} from 'next/server';

export const DELETE = async(request, {params}) =>{
    const id = params.id;

    await prisma.book.delete({where: {id:id}})

    return new NextResponse({"Book deleted": id});
}
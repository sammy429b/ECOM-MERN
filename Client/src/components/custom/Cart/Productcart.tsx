
const product = {
    image: 'https://images.unsplash.com/photo-1622836829480-7f7f7b7f6f7e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    title: 'Product 1',
    price: 23
};

function ProductCart() {
    const { image, title, price } = product;

    return (
        <div className='flex flex-col justify-center items-center w-full'>
            {/* Cart Header */}
            <div className='w-full bg-gray-200 flex justify-between px-4 py-2 border-b'>
                <div className='flex-1 text-center'>
                    <p className='font-semibold'>Product</p>
                </div>
                <div className='flex-1 text-center'>
                    <p className='font-semibold'>Title</p>
                </div>
                <div className='flex-1 text-center'>
                    <p className='font-semibold'>Price</p>
                </div>
                <div className='flex-1 text-center'>
                    <p className='font-semibold'>Quantity</p>
                </div>
                <div className='flex-1 text-center'>
                    <p className='font-semibold'>Total</p>
                </div>
                <div className='flex-1 text-center'>
                    <p className='font-semibold'>Remove</p>
                </div>
            </div>

            {/* Cart Item */}
            <div className='w-full flex justify-between items-center px-4 py-4 border-b'>
                <div className='flex-1 text-center'>
                    <img src={image} width="70px" alt={title} className='mx-auto' />
                </div>
                <div className='flex-1 text-center'>
                    <p>{title}</p>
                </div>
                <div className='flex-1 text-center'>
                    <p>${price}</p>
                </div>
                <div className='flex-1 text-center'>
                    <p>1</p>
                </div>
                <div className='flex-1 text-center'>
                    <p>${price}</p>
                </div>
                <div className='flex-1 text-center'>
                    <button className='text-red-500 font-bold'>X</button>
                </div>
            </div>
        </div>
    );
}

export default ProductCart;

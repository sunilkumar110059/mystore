import Link from 'next/link';

function ProductIndex({ data }) {
    

    return (
        <div className="row">
            {data?.map((curElem, index) => (
                <div className="col-12 col-md-3 mb-4" key={index}>
                    <div className="cover bordercolor2-2 border1 shadow1">
                        <Link href={'/product/[id]'} as={`/product/${curElem._id}`}>
                            <a className="d-block">
                                <div className="ovr"> <img className="imgs" src={`${curElem.mediaurl}`} alt={curElem.name} /> </div>
                                <div className="ovr font-size16 p-2 bordercolor2-2 border-bottom1">{curElem.name}</div>
                                <div className="cover p-2">
                                    <div className="row">
                                        <div className="col font-bold font-size14">INR {curElem.price}</div>
                                        <div className="col-auto" title="Views">
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </Link>

                    </div>
                </div>

            ))
            }
        </div>
    )
}

export default ProductIndex;
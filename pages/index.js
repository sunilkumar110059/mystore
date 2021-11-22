import ProductIndex from './product/productindex';
import baseUrl from '../admin/baseUrl';


// export async function getStaticProps() {
//   const res = await fetch(`${baseUrl}/api/productApi/productApi`);
//   const data = await res.json()
//   return {
//     props: { data: data }
//   }
// }


export async function getServerSideProps() {
  const res = await fetch(`${baseUrl}/api/productApi/productApi`);
  const data = await res.json()
  return {
    props: { data: data }
  }
}



function Home({ data }) {
  return (
    <div className="container py-5">
      <ProductIndex
        data={data}
      />

    </div>
  )
}
export default Home


import ODP from "@/components/pages/odp/ODP"

const Page: React.FC<{params: {odpUUID: string}}> = ({ params }) => {
    return <ODP odpUUID={params.odpUUID}/>
}

export default Page;
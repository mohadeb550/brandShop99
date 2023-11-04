import { useQuery } from "@tanstack/react-query";


export default function useCompanies() {

    const { data: companies , isLoading } = useQuery({
        queryKey:['companies'],
        queryFn: async () => {
          const res = await fetch('http://localhost:5000/companies');
          const data = await res.json();
          return data;
        }
      })
      return { companies, isLoading};
}

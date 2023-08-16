// sections
import { RegisterView } from 'src/sections/auth';
// utils
import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Join The UniNex Community',
};

async function getData() {
  const response = await axios.get(endpoints.role.list);
  return response.data;
}

export default async function RegisterPage() {
  const { roles } = await getData();

  return <RegisterView roles={roles} />;
}

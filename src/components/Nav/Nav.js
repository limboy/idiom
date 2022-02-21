import { useAppContext } from '../../hooks/useAppContext';

export default function Nav(props) {
  let { config } = useAppContext();
  console.log(config);
  return <div>Nav</div>;
}

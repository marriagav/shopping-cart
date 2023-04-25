import { useQuery, useMutation } from "react-query";
import firebaseApi from "../services/firebaseApi";
import { useAuth } from "../context/AuthContext";

interface response {
  data?: any;
  error?: any;
  ok: boolean;
}

export function useSignInWithGoogle() {
  const mutation = useMutation<response>({
    mutationFn: () => firebaseApi.signInWithGoogle(),
    onError: (error: any) => {
      alert(error);
    },
  });
  return mutation;
}

export function useSignOutUser() {
  return useMutation({
    mutationFn: () => firebaseApi.signOutUser(),
    onError: (error: any) => {
      alert(error);
    },
  });
}

export function useAddCartItem() {
  return useMutation({
    mutationFn: (item: item) => firebaseApi.addCartItem(item),
    onError: (error: any) => {
      alert(error);
    },
  });
}

export function useSaveCart() {
  const mutation = useMutation({
    mutationFn: ({
      cart,
      deletedItems,
    }: {
      cart: Map<item, number>;
      deletedItems: item[];
    }) => firebaseApi.saveCart(cart, deletedItems),
    onError: (error: any) => {
      alert(error);
    },
  });
  return mutation;
}

export function useLoadCart() {
  const { user } = useAuth();
  return useQuery(`${user}cart`, {
    queryFn: () => firebaseApi.loadCart(),
    onError: (error: any) => {
      alert(error);
    },
  });
}

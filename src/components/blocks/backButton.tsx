'use client';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

function BackButton({
    children,
}: React.PropsWithChildren) {
    const router = useRouter();
    return (
        <Button variant={"ghost"} onClick={() => router.back()}> {children}</Button>
    );
}

export default BackButton;
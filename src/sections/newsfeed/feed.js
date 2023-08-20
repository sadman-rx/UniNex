'use client';

import { useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Iconify from 'src/components/iconify';
import { alpha } from '@mui/material/styles';

import PostItem from './post-item';
import PostSkeleton from './post-skeleton';

export default function Feed() {
  const fileRef = useRef(null);

  const handleAttach = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const [posts, setPosts] = useState(Array.from({ length: 8 }).map((_, index) => ({ id: index })));

  const renderPostInput = (
    <Card sx={{ p: 3 }}>
      <InputBase
        multiline
        fullWidth
        rows={4}
        placeholder="Share what you are thinking here..."
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 1,
          border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.2)}`,
        }}
      />

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'text.secondary' }}>
          <Fab size="small" color="inherit" variant="softExtended" onClick={handleAttach}>
            <Iconify icon="solar:gallery-wide-bold" width={24} sx={{ color: 'success.main' }} />
            Image/Video
          </Fab>

          <Fab size="small" color="inherit" variant="softExtended">
            <Iconify icon="solar:videocamera-record-bold" width={24} sx={{ color: 'error.main' }} />
            Streaming
          </Fab>
        </Stack>

        <Button variant="contained">Post</Button>
      </Stack>

      <input ref={fileRef} type="file" style={{ display: 'none' }} />
    </Card>
  );

  console.log(posts);

  return (
    <Container maxWidth="md">
      <Stack spacing={3}>
        {renderPostInput}

        {posts.map((post) => post.user ? (
          <PostItem key={post.id} post={post} />
        ) : (
          <PostSkeleton key={post.id} />
        ))}
      </Stack>
    </Container>
  );
}
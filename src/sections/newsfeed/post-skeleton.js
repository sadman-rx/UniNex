import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';

export default function PostSkeleton() {
  return (
    <Card>
      <CardHeader
        avatar={<Skeleton variant="circular" width={40} height={40} />}
        title={<Skeleton variant="text" height={24} width="40%" />}
        subheader={<Skeleton variant="text" height={} width="20%" />}
      />

      <Typography variant="body2" sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>
        <Skeleton />
        <Skeleton />
      </Typography>

      <Box sx={{ p: 1 }}>
        <Skeleton variant="rectangular" height={0} sx={{ borderRadius: 1.5 }} />
      </Box>

      <Stack
        direction="row"
        alignItems="center"
        sx={{
          p: (theme) => theme.spacing(2, 3, 3, 3),
        }}
      >
        <AvatarGroup
          sx={{
            [`& .MuiAvatar-root`]: {
              width: 32,
              height: 32,
              marginRight: -10, // Adjust based on your design
            },
          }}
        >
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={32} height={32} />
        </AvatarGroup>
        <Box sx={{ flexGrow: 1 }} />
        <Skeleton variant="circular" width={24} height={24} />
        <Skeleton variant="circular" width={24} height={24} />
      </Stack>

      <Stack spacing={1.5} sx={{ px: 3, pb: 2 }}>
        <Stack direction="row" spacing={2}>
          <Skeleton variant="circular" width={40} height={40} />
          <Paper
            sx={{
              p: 1.5,
              flexGrow: 1,
              bgcolor: 'background.neutral',
            }}
          >
            <Stack
              sx={{ mb: 0.5 }}
              alignItems="center"
              justifyContent="space-between"
              direction="row"
            >
              <Box sx={{ typography: 'subtitle2', width: '40%' }}>
                <Skeleton height={10} width="100%" />
              </Box>
              <Box sx={{ typography: 'caption', color: 'text.disabled' }}>
                <Skeleton height={10} width="40%" />
              </Box>
            </Stack>
            <Box sx={{ typography: 'body2', color: 'text.secondary' }}>
              <Skeleton height={10} width="80%" />
              <Skeleton height={10} width="60%" />
            </Box>
          </Paper>
        </Stack>
        <Stack direction="row" spacing={2}>
          {/* ... Repeat the above structure for more comment skeletons */}
        </Stack>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        sx={{
          p: (theme) => theme.spacing(2, 3, 3, 3),
        }}
      >
        <Skeleton variant="rectangular" width={24} height={24} sx={{ marginRight: 1 }} />
        <Skeleton variant="rectangular" width={24} height={24} sx={{ marginRight: 1 }} />
        <Skeleton variant="rectangular" width={24} height={24} />
        <Box sx={{ flexGrow: 1 }} />
        <Skeleton variant="circular" width={24} height={24} />
        <Skeleton variant="circular" width={24} height={24} />
      </Stack>
    </Card>
  );
}

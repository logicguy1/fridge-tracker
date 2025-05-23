import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Chip,
  Box,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PublicIcon from '@mui/icons-material/Public';
import LikeButton from '../modals/like/likeButton';

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };
  
  // Extract tags from the comma-separated string if available
  const tagList = recipe.tags ? recipe.tags.split(',').slice(0, 3) : [];
  
  return (
    <Card
      sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 6
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardActionArea onClick={handleClick}>
          <CardMedia
            component="img"
            height="180"
            image={recipe.image_url || '/placeholder-recipe.jpg'}
            alt={recipe.name}
            sx={{ objectFit: 'cover' }}
          />
        </CardActionArea>
        {/* Position like button on top of the image */}
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 8, 
            right: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '50%',
            zIndex: 2
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <LikeButton recipeId={recipe.id} userId={recipe.likes[0]?.user_id} />
        </Box>
      </Box>
      
      <CardActionArea
        onClick={handleClick}
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'stretch'
        }}
      >
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 550 }}>
            {recipe.name}
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <RestaurantIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {recipe.category}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PublicIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {recipe.area}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ mt: 'auto' }}>
            {tagList.length > 0 && (
              <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', gap: 0.5 }}>
                {tagList.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag.trim()}
                    size="small"
                    sx={{
                      backgroundColor: 'primary.light',
                      color: 'primary.contrastText',
                      fontSize: '0.7rem'
                    }}
                  />
                ))}
              </Stack>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCard;
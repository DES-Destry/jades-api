export class ToggleRateResponseDto {
  // If like/dislike not exists and it added to database - return true
  // If like/dislike exists and it was removed from db - return false
  isRateAdded: boolean;
}

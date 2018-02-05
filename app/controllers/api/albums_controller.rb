class Api::AlbumsController < ApplicationController
  def index
    @albums = Album.all
  end



  # 
  # def index_by_artist
  #   @albums = Album.where('artist_id = ?', params[:id])
  # end

  def song_index
    @songs = Song.where('album_id = ?', params[:id])
  end



  def show
    @album = Album.find_by(id: params[:id])
    render :show
  end
end
